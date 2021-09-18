using System;
using System.Collections.Generic;
using System.Text;
using DrillingControlCenter.Data;
using ExcelDataReader;
using LiteDB;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace DrillingControlCenter.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class BitLoadDataController : ControllerBase
    {
        [HttpGet]
        public IEnumerable<BitLoadData> Get()
        {
            using var db = new LiteDatabase(@"drilling.db");
            var col = db.GetCollection<BitLoadData>("bitloads");

            return col.Query().ToList();
        }

        [HttpPost]
        public IEnumerable<BitLoadData> Post(IFormFile file)
        {
            Encoding.RegisterProvider(CodePagesEncodingProvider.Instance);

            using var db = new LiteDatabase(@"drilling.db");
            var col = db.GetCollection<BitLoadData>("bitloads");
            col.DeleteAll();

            if (file != null)
            {
                using (var stream = file.OpenReadStream())
                {
                    using (var reader = ExcelReaderFactory.CreateReader(stream))
                    {
                        do
                        {
                            var row = 0;
                            while (reader.Read())
                            {
                                if (row > 0)
                                {
                                    if (reader.GetValue(0) == null)
                                    {
                                        break;
                                    }

                                    var bitLoad = double.Parse(reader.GetValue(1).ToString() ?? "0");
                                    var alert = 0;

                                    if (bitLoad is > 30 and <= 35)
                                    {
                                        alert = 1;
                                    }
                                    else if (bitLoad > 35)
                                    {
                                        alert = 2;
                                    }

                                    var recommendation = "";
                                    if (alert == 1)
                                    {
                                        recommendation =
                                            "Необходимо уменьшить скорость бурения";
                                    }
                                    else if (alert == 2)
                                    {
                                        recommendation =
                                            "Критический уровень. Необходимо немедленно уменьшить скорость бурения";
                                    }

                                    var data = new BitLoadData()
                                    {
                                        Date = DateTime.Parse(reader.GetValue(0).ToString() ?? string.Empty),
                                        BitLoad = bitLoad,
                                        Alert = alert,
                                        Recommendation = recommendation
                                    };

                                    col.Insert(data);
                                }

                                row++;
                            }
                        } while (reader.NextResult());
                    }
                }
            }

            col = db.GetCollection<BitLoadData>("bitloads");

            return col.Query().ToList();
        }
    }
}
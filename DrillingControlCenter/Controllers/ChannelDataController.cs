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
    public class ChannelDataController : ControllerBase
    {
        [HttpGet]
        public IEnumerable<ChannelData> Get()
        {
            using var db = new LiteDatabase(@"drilling.db");
            var col = db.GetCollection<ChannelData>("channels");

            return col.Query().ToList();
        }

        [HttpPost]
        public IEnumerable<ChannelData> Post(IFormFile file)
        {
            Encoding.RegisterProvider(CodePagesEncodingProvider.Instance);

            using var db = new LiteDatabase(@"drilling.db");
            var col = db.GetCollection<ChannelData>("channels");
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

                                    var rec = int.Parse(reader.GetValue(5).ToString() ?? "0");
                                    var recStr = "";
                                    if (rec == 1)
                                    {
                                        recStr = "Сделать трассировку до узла";
                                    }
                                    else if (rec == 2)
                                    {
                                        recStr = "Использовать резервный канал";
                                    }

                                    var data = new ChannelData()
                                    {
                                        Date = DateTime.Parse(reader.GetValue(0).ToString() ?? string.Empty),
                                        System = reader.GetValue(1).ToString(),
                                        ResponseTime = double.Parse(reader.GetValue(2).ToString() ?? "0"),
                                        PacketLossPercentage = double.Parse(reader.GetValue(3).ToString() ?? "0"),
                                        Alert = int.Parse(reader.GetValue(4).ToString() ?? "0"),
                                        Rec = rec,
                                        Recommendation = recStr
                                    };

                                    col.Insert(data);
                                }

                                row++;
                            }
                        } while (reader.NextResult());
                    }
                }
            }

            col = db.GetCollection<ChannelData>("channels");

            return col.Query().ToList();
        }
    }
}
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
    public class ServerDataController : ControllerBase
    {
        [HttpGet]
        public IEnumerable<ServerData> Get()
        {
            using var db = new LiteDatabase(@"drilling.db");
            var col = db.GetCollection<ServerData>("servers");

            return col.Query().ToList();
        }

        [HttpPost]
        public IEnumerable<ServerData> Post(IFormFile file)
        {
            Encoding.RegisterProvider(CodePagesEncodingProvider.Instance);

            using var db = new LiteDatabase(@"drilling.db");
            var col = db.GetCollection<ServerData>("servers");
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

                                    var freeDiskSpace = double.Parse(reader.GetValue(2).ToString() ?? "0");
                                    var alert = 0;

                                    if (freeDiskSpace is < 40 and >= 30)
                                    {
                                        alert = 1;
                                    }
                                    else if (freeDiskSpace < 30)
                                    {
                                        alert = 2;
                                    }

                                    var recommendation = "";
                                    if (alert == 1)
                                    {
                                        recommendation =
                                            "Необходимо освободить место. Рекомендуется удалить старые лог-файлы";
                                    }
                                    else if (alert == 2)
                                    {
                                        recommendation =
                                            "Критический уровень. Необходимо освободить место. Рекомендуется удалить старые лог-файлы";
                                    }

                                    var data = new ServerData()
                                    {
                                        Date = DateTime.Parse(reader.GetValue(0).ToString() ?? string.Empty),
                                        System = reader.GetValue(1).ToString(),
                                        FreeDiskSpace = double.Parse(reader.GetValue(2).ToString() ?? "0"),
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

            col = db.GetCollection<ServerData>("servers");

            return col.Query().ToList();
        }
    }
}
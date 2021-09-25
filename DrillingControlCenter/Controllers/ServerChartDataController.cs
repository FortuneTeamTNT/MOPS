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
    public class ServerChartDataController : ControllerBase
    {
        [HttpGet]
        public IEnumerable<ServerChartData> Get()
        {
            var db = Program.GetDatabase();
            var col = db.GetCollection<ServerChartData>("servercharts");

            return col.Query().ToList();
        }

        [HttpPost]
        public IEnumerable<ServerChartData> Post(IFormFile file)
        {
            Encoding.RegisterProvider(CodePagesEncodingProvider.Instance);

            var db = Program.GetDatabase();
            var col = db.GetCollection<ServerChartData>("servercharts");
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

                                    var data = new ServerChartData()
                                    {
                                        Date = DateTime.Parse(reader.GetValue(0).ToString() ?? string.Empty),
                                        FreeDiskSpace1 = double.Parse(reader.GetValue(1).ToString() ?? "0"),
                                        FreeDiskSpace2 = double.Parse(reader.GetValue(2).ToString() ?? "0"),
                                        FreeDiskSpace3 = double.Parse(reader.GetValue(3).ToString() ?? "0")
                                    };

                                    col.Insert(data);
                                }

                                row++;
                            }
                        } while (reader.NextResult());
                    }
                }
            }

            col = db.GetCollection<ServerChartData>("servercharts");

            return col.Query().ToList();
        }
    }
}
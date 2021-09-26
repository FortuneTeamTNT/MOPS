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
            var db = Program.GetDatabase();
            var col = db.GetCollection<ChannelData>("channels");

            return col.Query().ToList();
        }

        [HttpPost]
        public IEnumerable<ChannelData> Post(IFormFile file)
        {
            Encoding.RegisterProvider(CodePagesEncodingProvider.Instance);

            var db = Program.GetDatabase();
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

                                    var responseTime = double.Parse(reader.GetValue(1).ToString() ?? "0");

                                    var alert = 0;
                                    var recommendation = "";

                                    if (responseTime is > 0 and <= 10)
                                    {
                                        alert = 1;
                                        recommendation = @"Время отклика в пределах нормы.
Каналы связи работают в штатном режиме. Время отклика в пределах нормы: от 0 до 10 мс.";
                                    }
                                    else if (responseTime is > 10 and <= 25)
                                    {
                                        alert = 2;
                                        recommendation = @"Важно! Время отклика в критических пределах.
Каналы связи работают на предельных значениях. В них фиксируется большое количество потерь пакетов данных. Система автоматически создала обращение на группу техподдержки для поиска и устранения причин сбоев.";
                                    }
                                    else if (responseTime is > 25 and <= 100)
                                    {
                                        alert = 3;
                                        recommendation = @"Критично! Потеря связи!
Текст: Авария на каналах связи. Система автоматически создала обращение на группу техподдержки устранения причин сбоев.";
                                    }

                                    var data = new ChannelData()
                                    {
                                        Date = DateTime.Parse(reader.GetValue(0).ToString() ?? string.Empty),
                                        ResponseTime = responseTime,
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

            col = db.GetCollection<ChannelData>("channels");

            return col.Query().ToList();
        }
    }
}
using System;
using System.Collections.Generic;
using System.Text;
using DrillingControlCenter.Data;
using ExcelDataReader;
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
            var db = Program.GetDatabase();
            var col = db.GetCollection<BitLoadData>("bitloads");

            return col.Query().ToList();
        }

        [HttpPost]
        public IEnumerable<BitLoadData> Post(IFormFile file)
        {
            Encoding.RegisterProvider(CodePagesEncodingProvider.Instance);

            var db = Program.GetDatabase();
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
                                    var recommendation = "";

                                    if (bitLoad is > 0 and <= 15)
                                    {
                                        alert = 1;
                                        recommendation = @"Нагрузка на долото в пределах нормы
Нагрузка на долото в пределах нормальных значений: от 0 до 15 усл. единиц.";
                                    }
                                    else if (bitLoad is > 15 and <= 25)
                                    {
                                        alert = 2;
                                        recommendation = @"Нагрузка на долото в верхних пределах нормы
Нагрузка на долото в верхних пределах нормальных значений: от 15 до 25 усл. единиц. Будьте внимательны. Резкое увеличение нагрузки может привести к аварии.";
                                    }
                                    else if (bitLoad is > 25 and <= 35)
                                    {
                                        alert = 3;
                                        recommendation = @"Важно! Нагрузка на долото выше нормы
Нагрузка на долото выше нормальных значений: от 25 до 35 усл.единиц. Необходимо снизить скорость бурения и выполнить действия снижающие нагрузку на долото.";
                                    }
                                    else if (bitLoad is > 35 and <= 70)
                                    {
                                        alert = 4;
                                        recommendation = @"Критично! Нагрузка на долото зашкаливает!
Нагрузка на долото в критических значениях: выше 35 усл. единиц. Включен аварийный режим работы. Началось автоматическое снижение давления на долото.";
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
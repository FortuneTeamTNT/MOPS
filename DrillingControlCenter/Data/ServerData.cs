using System;
using LiteDB;

namespace DrillingControlCenter.Data
{
    public class ServerData
    {
        public ObjectId Id { get; set; }

        public DateTime Date { get; set; }

        public string DateString => Date.ToString("dd.MM.yyyy HH:mm");

        public string System { get; set; }

        public double FreeDiskSpace { get; set; }

        public int Alert { get; set; }

        public string Recommendation { get; set; }
    }
}
using System;
using LiteDB;

namespace DrillingControlCenter.Data
{
    public class ChannelData
    {
        public ObjectId Id { get; set; }

        public DateTime Date { get; set; }

        public string DateString => Date.ToString("dd.MM.yyyy HH:mm");

        public string System { get; set; }

        public double ResponseTime { get; set; }

        public double PacketLossPercentage { get; set; }

        public int Alert { get; set; }

        public int Rec { get; set; }

        public string Recommendation { get; set; }
    }
}
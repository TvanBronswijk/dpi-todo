using System;
using System.Collections.Generic;

namespace ToDo.Core.models
{
    [Serializable]
    public class Calendar : Message
    {
        public DateTime Date { get; set; }
        public IEnumerable<User> Invited { get; set; }
    }
}
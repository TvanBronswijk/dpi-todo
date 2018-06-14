using System;

namespace ToDo.Core.models
{
    [Serializable]
    public abstract class Message
    {
        public DateTime Created { get; set; }
        public User Owner { get; set; }
        public string Content { get; set; }
    }
}
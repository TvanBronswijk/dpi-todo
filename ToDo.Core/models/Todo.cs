using System;

namespace ToDo.Core.models
{
    [Serializable]
    public class Todo : Message
    {
        public User Assignee { get; set; }
    }
}
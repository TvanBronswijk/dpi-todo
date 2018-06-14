using System;
using ToDo.Core.models;
using ToDo.Messaging;

namespace ToDo.Aggregator
{
    public class Aggregator
    {
        public static void Route()
        {
            Console.WriteLine("Routing...");
            MessageHandler.Recieve<Message>("todo-app.messages", (model, ea) =>
            {
                var body = ea.Body;
                var payload = MessageHandler.Deserialize<Message>(body);
                Console.WriteLine("WROTE: " + payload.Content);
                switch (payload)
                {
                    case Todo t:
                        MessageHandler.Send("todo-app." + t.Assignee.Name + ".todo", t);
                        break;
                    case Calendar c:
                        foreach (var invitee in c.Invited)
                        {
                            MessageHandler.Send("todo-app." + invitee.Name + ".calendar", c);
                        }
                        break;
                    case Note n:
                        MessageHandler.Send("todo-app." + n.Owner.Name + ".note", n);
                        break;
                }
            });               
        }
    }
}
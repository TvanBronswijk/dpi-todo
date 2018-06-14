using System;
using ToDo.Core.models;
using ToDo.Messaging;

namespace ToDo.Logger
{
    public static class Logger
    {

        public static void Log()
        {
            MessageHandler.Recieve<Message>("todo-app.messages", (model, ea) =>
            {
                var body = ea.Body;
                var payload = MessageHandler.Deserialize<Message>(body);
                Console.WriteLine(payload.Content);
                MessageHandler.Send("todo-app.messages", payload);
            });
        }
    }
}
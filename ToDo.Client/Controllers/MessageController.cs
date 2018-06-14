using System.IO;
using System.Net;
using System.Net.Http;
using System.Net.Http.Headers;
using Microsoft.AspNetCore.Mvc;
using RabbitMQ.Client.Apigen.Attributes;
using ToDo.Messaging;
using ToDo.Core.models;

namespace ToDo.Client.Controllers
{
    [Route("api/messages")]
    [ApiController]
    public class MessageController : Controller
    {
        [Route("{username}/todos")]
        [HttpGet]
        public HttpResponseMessage GetTodo(string username) => Get<Todo>("todo", username);
        
        [Route("{username}/Calendars")]
        [HttpGet]
        public HttpResponseMessage GetCalendar(string username) => Get<Calendar>("calendar", username);
        
        [Route("{username}/notes")]
        [HttpGet]
        public HttpResponseMessage GetNote(string username) => Get<Note>("note", username);

        private HttpResponseMessage Get<T>(string queue, string username)
        where T : Message
        {
            HttpResponseMessage result = new HttpResponseMessage(HttpStatusCode.OK);
            var stream = new MemoryStream();
                
                MessageHandler.Recieve<T>("todo-app." + username + "." + queue, (model, ea) =>
                {
                    var body = ea.Body;
                    var payload = MessageHandler.Deserialize<Message>(body);
                    using (var writer = new StreamWriter(stream))
                    {
                        writer.WriteLine(payload.Content);
                    }
                });
            result.Content = new StreamContent(stream);
            result.Content.Headers.ContentType = new MediaTypeHeaderValue("application/octet-stream");
            return result;
        }

        [Route("todos")]
        [HttpPost]
        public void SendTodo([FromBody] Todo payload) => Send(payload);
        
        [Route("calendars")]
        [HttpPost]
        public void SendCalendar([FromBody] Calendar payload) => Send(payload);
        
        [Route("notes")]
        [HttpPost]
        public void SendNote([FromBody] Note payload) => Send(payload);
        
        private void Send(Message payload) => MessageHandler.Send("todo-app.messages", payload);  
    }
}
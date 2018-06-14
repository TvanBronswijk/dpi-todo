using System.Collections.Generic;
using System.IO;
using System.Linq;
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
        public IActionResult GetTodo(string username) => Get<Todo>("todo", username);
        
        [Route("{username}/Calendars")]
        [HttpGet]
        public IActionResult GetCalendar(string username) => Get<Calendar>("calendar", username);
        
        [Route("{username}/notes")]
        [HttpGet]
        public IActionResult GetNote(string username) => Get<Note>("note", username);

        private IActionResult Get<T>(string queue, string username)
        where T : Message
        {  
            return new ObjectResult(NoDb.messages.Where(mes => mes.Owner.Name == username));
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
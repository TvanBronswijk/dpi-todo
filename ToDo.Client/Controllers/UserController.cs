using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using ToDo.Core.models;

namespace ToDo.Client.Controllers
{
    [Route("api/users")]
    [ApiController]
    public class UserController : Controller
    {
        [HttpGet]
        public IActionResult GetAll()
        {
            return new ObjectResult(new List<User>
            {
                new User{Name = "Tobi"}, 
                new User{Name = "Pepijn"}, 
                new User{Name = "Daan"},
                new User{Name = "Sven"},
                new User{Name = "Sander"},
                new User{Name = "Tom"},
                new User{Name = "Laurens"}
            });
        }
    }
}
using Domain;
using Application.Activities;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace API.Controllers
{
    public class ActivitiesController : BaseApiController
    {
        // Mediator is private within the parent class (BaseApiController)

        //[Http"something"] = end points
        [HttpGet] //For getting ALL resources
        // api/activities
        public async Task<ActionResult<List<Activity>>> GetActivities()
        {
            return await Mediator.Send(new List.Query()); //Sends a request to the mediator.
        }

        [HttpGet("{id}")]//for getting specific resources
        //api/activities/asddfgfsa
        public async Task<ActionResult<Activity>> GetActivity(Guid id)
        {
            return await Mediator.Send(new Details.Query {Id = id});// sets 
        }

        [HttpPost] //for creating resources
        //IActionResult is similar to "any" type.
        public async Task<IActionResult> CreateActivity(Activity activity) //creates a new activity
        {
            await Mediator.Send(new Create.Command { Activity = activity });
            return Ok();
        }

        [HttpPut("{id}")] //For updating resources
        public async Task<IActionResult> EditActivity(Guid id, Activity activity)
        {
            activity.Id = id;
            await Mediator.Send(new Edit.Command { Activity = activity});
            return Ok();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteActivity(Guid id)
        {
            await Mediator.Send(new Delete.Command { Id = id});
            return Ok();
        }

    }
}

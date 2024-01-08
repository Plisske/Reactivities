using Domain;
using Application.Activities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;

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
            return HandleResult(await Mediator.Send(new List.Query())); //Sends a request to the mediator.
        }

        [HttpGet("{id}")]//for getting specific resources
        //api/activities/asddfgfsa
        public async Task<IActionResult> GetActivity(Guid id) //IActionResults returns HTTP responses
        {
            return HandleResult(await Mediator.Send(new Details.Query { Id = id }));
        }

        [HttpPost] //for creating resources
        //IActionResult is similar to "any" type.
        public async Task<IActionResult> CreateActivity(Activity activity) //creates a new activity
        {
            return HandleResult(await Mediator.Send(new Create.Command { Activity = activity }));
        }

        //[Authorize(Policy = "IsActivityHost")]
        [HttpPut("{id}")] //For updating resources
        public async Task<IActionResult> EditActivity(Guid id, Activity activity)
        {
            activity.Id = id;
            return HandleResult(await Mediator.Send(new Edit.Command { Activity = activity }));
        }

        // [Authorize(Policy = "IsActivityHost")]
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteActivity(Guid id)
        {
            return HandleResult(await Mediator.Send(new Delete.Command { Id = id }));
        }

        [HttpPost("{id}/attend")]
        public async Task<IActionResult> Attend(Guid id)
        {
            return HandleResult(await Mediator.Send(new UpdateAttendance.Command { Id = id }));
        }


    }
}


using Microsoft.AspNetCore.Mvc;
using MyTravelJournal.Api.Models;

namespace MyTravelJournal.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class TripsController : ControllerBase
{
    private static readonly List<Trip> trips = new()
    {
        new Trip
        {
            Id = 1,
            Title = "Melbourne Adventure",
            Destination = "Melbourne, Australia",
            StartDate = new DateTime(2027, 8, 15),
            EndDate = new DateTime(2027, 8, 21),
            Description = "A trip filled with travel memories.",
            IsPublic = false
        }
    };

    [HttpGet]
    public ActionResult<List<Trip>> GetTrips()
    {
        return Ok(trips);
    }

    [HttpGet("{id}")]
    public ActionResult<Trip> GetTrip(int id)
    {
        var trip = trips.FirstOrDefault(t => t.Id == id);

        if (trip == null)
        {
            return NotFound();
        }

        return Ok(trip);
    }

    [HttpPost]
    public ActionResult<Trip> CreateTrip(Trip trip)
    {
        trip.Id = trips.Count == 0
            ? 1
            : trips.Max(t => t.Id) + 1;

        trips.Add(trip);

        return CreatedAtAction(
            nameof(GetTrip),
            new { id = trip.Id },
            trip
        );
    }
}

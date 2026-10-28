
namespace MyTravelJournal.Api.Models;

public class Trip
{
    public int Id { get; set; }

    public string Title { get; set; } = "";

    public string Destination { get; set; } = "";

    public DateTime StartDate { get; set; }

    public DateTime EndDate { get; set; }

    public string Description { get; set; } = "";

    public bool IsPublic { get; set; } = false;
}

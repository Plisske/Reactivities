namespace Domain
{
    public class ActivityAttendee
    {
        public string AppUserId { get; set; }
        public AppUser AppUser { get; set; }
        public Guid ActivityId {  get; set; }
        public Activity Activity { get; set; }
        //Can add any property we want now
        public bool IsHost { get; set; }
    }
}
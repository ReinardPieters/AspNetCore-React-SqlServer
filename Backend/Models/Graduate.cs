using System.Text.Json.Serialization;

namespace Backend.Models
{
    public class Graduate
    {
        public int GraduateId { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Email { get; set; }
        public string PhoneNumber { get; set; }
        public string DateOfBirth { get; set; }
        [JsonIgnore]
        public DateTime DateCreated { get; set; }
        [JsonIgnore]
        public DateTime? DateModified { get; set; }
        public bool IsDeleted { get; set; }

        [JsonPropertyName("dateCreated")]
        public string FormattedDateCreated => DateCreated.ToString("dd-MM-yyyy HH:mm:ss");

        [JsonPropertyName("dateModified")]
        public string FormattedDateModified => DateModified?.ToString("dd-MM-yyyy HH:mm:ss");

    }
}

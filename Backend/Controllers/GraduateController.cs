using Backend.Data;
using Backend.Models;
using Microsoft.AspNetCore.Mvc;
using System.Text.RegularExpressions;

namespace Backend.Controllers
{
    
    [Route("api/[controller]")]
    [ApiController]
    public class GraduateController : ControllerBase
    {
        public readonly AppDbContext Context;
        public GraduateController(AppDbContext dbContext)
        {
            this.Context = dbContext;
        }
        [HttpPut("update/{id}")]
        public IActionResult UpdateGrad([FromBody] UpdateGradDto graduate,int id)
        {
            try
            {
                if (!IsValidEmail(graduate.Email))
                    return BadRequest(new { message = "Invalid email format" });

                if (!IsValidPhoneNumber(graduate.PhoneNumber))
                    return BadRequest(new { message = "Invalid phone number format. Use +27 xx xxx xxx" });

                var grad = Context.Graduates.FirstOrDefault(u => u.GraduateId == id);
                if (grad == null)
                {
                    return BadRequest(new { message = "Grad not found" });
                }
                else
                {
                    grad.FirstName = graduate.FirstName;
                    grad.LastName = graduate.LastName;
                    grad.Email = graduate.Email;
                    grad.PhoneNumber = graduate.PhoneNumber;
                    grad.DateOfBirth = graduate.DateOfBirth;
                    grad.DateModified = DateTime.Now;
                    Context.SaveChanges();
                    return Ok(new { message = "Updated grad" + grad.FirstName });
                }
            }catch(Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }
    
            

        }
        [HttpDelete("delete/{id}")]
        public IActionResult Delete(int id)
        {
            var grad = Context.Graduates.FirstOrDefault(u => u.GraduateId == id);
            if (grad != null)
            {
                grad.IsDeleted = true;
                Context.SaveChanges();
                return Ok(new { message = "Grad was deleted" });
            }
            else
            {
                return BadRequest(new { message = "Graduate does not exist" });
            }
            }
        [HttpGet("getbyid/{id}")]   
        public IActionResult GetById(int id)
        {
            var graduate = Context.Graduates.FirstOrDefault(u => u.GraduateId == id);  
            return Ok(graduate);
        }
        [HttpGet("getall")]
        public IActionResult GetAll() {
            var graduates = Context.Graduates.ToList();
            return Ok(graduates);
        }
        [HttpPost("register")]
        public IActionResult CreateGraduate([FromBody] CreateGradDto createGraduate)
        {
            Console.WriteLine("Got Request");
            if (createGraduate == null) {
                return BadRequest(new {message="Got nothing"});
            }
            
            if (!IsValidEmail(createGraduate.Email))
                return BadRequest(new { message = "Invalid email format" });
            
            if (!IsValidPhoneNumber(createGraduate.PhoneNumber))
                return BadRequest(new { message = "Invalid phone number format. Use +27 xx xxx xxx" });
            
            var graduate = Context.Graduates.FirstOrDefault(u => u.Email == createGraduate.Email);
            if (graduate == null) {
                graduate = new Graduate
                {
                    FirstName = createGraduate.FirstName,
                    LastName = createGraduate.LastName,
                    PhoneNumber = createGraduate.PhoneNumber,
                    Email = createGraduate.Email,
                    DateOfBirth = createGraduate.DateOfBirth,
                    DateCreated = DateTime.Now,
                    DateModified = null,
                    IsDeleted = false
                };
                Context.Graduates.Add(graduate);
                Context.SaveChanges();
                return Ok(new {status = "Success"});
            }
            else
            {
                return BadRequest(new { message = "Email already taken" });
            }
        }

        private bool IsValidEmail(string email)
        {
            var emailRegex = new Regex(@"^[^@\s]+@[^@\s]+\.[^@\s]+$");
            return emailRegex.IsMatch(email);
        }

        private bool IsValidPhoneNumber(string phoneNumber)
        {
            var phoneRegex = new Regex(@"^\+27 \d{2} \d{3} \d{4}$");
            return phoneRegex.IsMatch(phoneNumber);
        }
    }
    public class CreateGradDto()
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Email { get; set; }
        public string DateOfBirth { get; set; }
        public string PhoneNumber { get; set; }
    }
    public class UpdateGradDto()
    {
        public int GraduateId { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Email { get; set; }
        public string DateOfBirth { get; set; }
        public string PhoneNumber { get; set; }
    }

}

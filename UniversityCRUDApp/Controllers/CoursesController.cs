using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using UniversityCRUDApp.Data;
using UniversityCRUDApp.Models.CourseEntity;
using UniversityCRUDApp.Models.StudentCourseEntity;
using UniversityCRUDApp.Models.StudentEntity;
using UniversityCRUDApp.Models.UniversityEntity;

namespace UniversityCRUDApp.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CoursesController : Controller
    {
        private readonly UniversityAppAPIDbContext dbContext;

        public CoursesController(UniversityAppAPIDbContext dbContext)
        {
            this.dbContext = dbContext;
        }

        [HttpGet]
        public async Task<IActionResult> GetUniversities()
        {
            return Ok(await dbContext.Courses.ToListAsync());
        }

        [HttpGet]
        [Route("{ID:guid}")]
        public async Task<IActionResult> GetCourse([FromRoute] Guid ID)
        {
            var course = await dbContext.Courses
                .Include(s => s.StudentCourses)
                    .ThenInclude(sc => sc.Student)  // Include the related Course entities
                  // Include the related University entity
                .Where(s => s.Id == ID)
                .Select(s => new Course
                {
                    Id = s.Id,
                    CourseName = s.CourseName,
                    CourseAbbriviation = s.CourseAbbriviation,
         
                    StudentCourses = s.StudentCourses.Select(sc => new StudentCourse()
                    {
                        Student = sc.Student
                    }).ToList()  // Load related courses
                })
                .FirstOrDefaultAsync();

            if (course == null)
            {
                return NotFound();
            }

            return Ok(course);
        }
        [HttpPost]
        public async Task<IActionResult> AddCourse(AddCourse addCourse)
        {
            var Course = new Course();
            {
                Course.Id = Guid.NewGuid();
                Course.CourseName = addCourse.CourseName;
                Course.CourseAbbriviation = addCourse.CourseAbbriviation;

            };

            await dbContext.Courses.AddAsync(Course);
            await dbContext.SaveChangesAsync();

            return Ok(Course);
        }

        [HttpDelete]
        [Route("{id:guid}")]
        public async Task<IActionResult> DeleteCourse([FromRoute] Guid id)
        {
            var Course = await dbContext.Courses.FindAsync(id);
            if (Course == null)
            {
                return NotFound();

            }
            dbContext.Courses.Remove(Course);
            await dbContext.SaveChangesAsync();
            return Ok(Course);
        }
    }
}

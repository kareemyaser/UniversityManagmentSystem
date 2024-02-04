using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using UniversityCRUDApp.Data;
using UniversityCRUDApp.Models.StudentCourseEntity;
using UniversityCRUDApp.Models.StudentEntity;

namespace UniversityCRUDApp.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class StudentsController : Controller
    {
        private readonly UniversityAppAPIDbContext dbContext;

        public StudentsController(UniversityAppAPIDbContext dbContext)
        {
            this.dbContext = dbContext;
        }



        [HttpGet]
        public async Task<IActionResult> GetAllStudents()
        {
            var query = from student in dbContext.Students
                        join university in dbContext.Universities on student.UniversityId equals university.Id
                        select new Student()
                        {
                            Id = student.Id,
                            StudentName = student.StudentName,
                            Email = student.Email,
                            UniversityId = student.UniversityId,
                            University = university

                        };

            var Students = await query.ToListAsync();

            return Ok(Students);
            //return Ok(await dbContext.Students.ToListAsync());
        }

        [HttpGet]
        [Route("{ID:guid}")]
        public async Task<IActionResult> GetStudent([FromRoute] Guid ID)
        {
            var studentWithCourses = await dbContext.Students
                .Include(s => s.StudentCourses)
                    .ThenInclude(sc => sc.Course)  // Include the related Course entities
                .Include(s => s.University)  // Include the related University entity
                .Where(s => s.Id == ID)
                .Select(s => new Student
                {
                    Id = s.Id,
                    StudentName = s.StudentName,
                    Email = s.Email,
                    UniversityId = s.UniversityId,
                    University = s.University,
                    StudentCourses = s.StudentCourses.Select(sc => new StudentCourse()
                    {
                        CourseId = sc.CourseId,
                        StudentId = sc.StudentId,
                        Course = sc.Course
                    }).ToList()  // Load related courses
                })
                .FirstOrDefaultAsync();

            if (studentWithCourses == null)
            {
                return NotFound();
            }

            return Ok(studentWithCourses);
        }
        [HttpPost]
        public async Task<IActionResult> AddStudent(AddStudent addStudent)
        {
            var Student = new Student();
            {
                Student.Id = Guid.NewGuid();
                Student.StudentName = addStudent.StudentName;
                Student.Email = addStudent.Email;
                Student.UniversityId = addStudent.UniversityID;

            };

            await dbContext.Students.AddAsync(Student);
            await dbContext.SaveChangesAsync();

            return Ok(Student);
        }

        [HttpDelete]
        [Route("{id:guid}")]
        public async Task<IActionResult> DeleteStudent([FromRoute] Guid id)
        {
            var Student = await dbContext.Students.FindAsync(id);
            if (Student == null)
            {
                return NotFound();  

            }
            dbContext.Students.Remove(Student);
            await dbContext.SaveChangesAsync();
            return Ok(Student);
        }
    }
}

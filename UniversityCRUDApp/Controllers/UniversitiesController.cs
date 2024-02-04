using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using UniversityCRUDApp.Data;
using UniversityCRUDApp.Models.StudentEntity;
using UniversityCRUDApp.Models.UniversityEntity;

namespace UniversityCRUDApp.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UniversitiesController : Controller
    {
        private readonly UniversityAppAPIDbContext dbContext;

        public UniversitiesController( UniversityAppAPIDbContext dbContext)
        {
            this.dbContext = dbContext;
        }



        [HttpGet]
        public async Task<IActionResult> GetAllUniversities()
        {
            return Ok(await dbContext.Universities.ToListAsync());
        }

        [HttpGet]
        [Route("{ID:guid}")]
        public async Task<IActionResult> GetUniversity([FromRoute] Guid ID)
        {

            var query = from university in dbContext.Universities
                        where university.Id == ID
                        join student in dbContext.Students on university.Id equals student.UniversityId into studentGroup
                        from stu in studentGroup.DefaultIfEmpty()
                        select new University
                        {
                            Id = university.Id,
                            UniversityName = university.UniversityName,
                            Location = university.Location,
                            Students = stu != null ? new List<Student> { stu } : new List<Student>()
                        };

            var University = await query.FirstOrDefaultAsync();

            //await dbContext.Universities.Where(u => u.Id == ID)
            //    .Include(u => u.Students).FirstOrDefaultAsync();

            if (University == null)
            {
                return NotFound();
            }

            return Ok(University);
        }

        [HttpPost]
        public async Task<IActionResult> AddUniversity(AddUniversity addUniversity)
        {
            var University = new University();
            {
                University.Id = Guid.NewGuid();
                University.UniversityName = addUniversity.UniversityName;
                University.Location = addUniversity.Location;

            };

            await dbContext.Universities.AddAsync(University);
            await dbContext.SaveChangesAsync();

            return Ok(University);
        }

        [HttpDelete]
        [Route("{id:guid}")]
        public async Task<IActionResult> DeleteUniversity([FromRoute] Guid id)
        {
            var University = await dbContext.Universities.FindAsync(id);
            if (University == null)
            {
                return NotFound();

            }
            dbContext.Universities.Remove(University);
            await dbContext.SaveChangesAsync();
            return Ok(University);
        }
    }



}


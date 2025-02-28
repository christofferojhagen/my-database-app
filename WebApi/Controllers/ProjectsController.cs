using Business.Interfaces;
using Business.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Identity.Client;




namespace WebApi.Controllers;

[Route("api/[controller]")]
[ApiController]
public class ProjectsController(IProjectService projectService) : ControllerBase
{
    private readonly IProjectService _projectService = projectService;

    [HttpPost]
    public async Task<IActionResult> Create(ProjectRegistrationForm form)
    {
        if (!ModelState.IsValid && form.CustomerId < 1)
        {
            return BadRequest();

        }
        var result = await _projectService.CreateProjectAsync(form);
        return result ? Created("", null) : Problem();

    }
        
    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
         var projects = await _projectService.GetProjectsAsync();
         return Ok(projects);
    }
   
    [HttpPut("{id}")]
    public async Task<IActionResult> Update(int id, ProjectRegistrationForm form)
    {
        if (!ModelState.IsValid)
            return BadRequest();

        var success = await _projectService.UpdateProjectAsync(id, form);
        return success ? NoContent() : NotFound();
    }

}

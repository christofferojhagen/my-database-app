using Business.Factories;
using Business.Interfaces;
using Business.Models;
using Data.Interfaces;
using Data.Repositories;

namespace Business.Services;

public class ProjectService(IProjectRepository projectRepository, ICustomerRepository customerRepository) : IProjectService
{
    private readonly IProjectRepository _projectRepository = projectRepository;
    private readonly ICustomerRepository _customerRepository = customerRepository;

    public async Task<bool> CreateProjectAsync(ProjectRegistrationForm form)
    {
        if (!await _customerRepository.ExistAsync(customer => customer.Id == form.CustomerId))
            return false;
        var projectEntity = ProjectFactory.Create(form);
        if (projectEntity == null)
            return false;

        bool result = await _projectRepository.AddAsync(projectEntity);
        return result;
    }

    public async Task<IEnumerable<Project?>> GetProjectsAsync()
    {
        var entities = await _projectRepository.GetAllAsync();
        var projects = entities.Select(ProjectFactory.Create);
        return projects;
    }
    public async Task<bool> UpdateProjectAsync(int id, ProjectRegistrationForm form) 
    {
        var entity = await _projectRepository.GetAsync(x => x.Id == id);
        if (entity == null)
            return false;

        entity.ProjectName = form.ProjectName;
        entity.Description = form.Description;
        entity.CustomerId = form.CustomerId;


        return await _projectRepository.UpdateAsync(entity);
    }

 
}
    

    


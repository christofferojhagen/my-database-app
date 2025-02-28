using System.Linq.Expressions;

namespace Data.Interfaces
{
    public interface IBaseRepository<TEntity> where TEntity : class
    {
        Task<bool> AddAsync(TEntity entity);
        Task<bool> ExistAsync(Expression<Func<TEntity, bool>> expression);
        Task<IEnumerable<TEntity>> GetAllAsync();
        Task<TEntity?> GetAsync(Expression<Func<TEntity, bool>> expression);
        Task<bool> UpdateAsync(TEntity entity);
    }


}
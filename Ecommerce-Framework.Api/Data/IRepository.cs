

using Ecommerce_Framework.Api.Models;
using System.Threading.Tasks;

namespace Ecommerce_Framework.Api.Data
{
   public interface  IRepository
    {
         void Add<T>(T entity) where T : class;
        void Update<T>(T entity) where T : class;
        void Delete<T>(T entity) where T : class;
        Task<bool> SaveChangesAsync();

        Task<ProdutoModel[]> GetAllProdutoAsync();
        Task<ProdutoModel> GetProdutoAsyncById(int produtoId);
    }
}

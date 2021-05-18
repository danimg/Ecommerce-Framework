using Ecommerce_Framework.Api.Models;

namespace Ecommerce_Framework.Api.Data.Repositories
{
    public class UsuarioRepository
    {
        private readonly EcommerceFrameworkContext _context;
     //   public UsuarioRepository(EcommerceFrameworkContext context) : base(context) => _context = context;

        //public void Add(UsuarioModel atendimentoGrupo, bool returnId = false)
        //{


        //    if (returnId && _context.Environment.Name != "Testing")
        //        atendimentoGrupo.AtendimentoGrupoId = GetNewSequence("Atendimento", "AtendimentoGrupo", "AtendimentoGrupo");

        //    _context.AtendimentoGrupo.Add(atendimentoGrupo);
        //}
        //public AtendimentoGrupoModel Find(int id)
        //{
        //    return _context.AtendimentoGrupo.AsNoTracking()
        //              .FirstOrDefault(t => t.AtendimentoGrupoId == id);
        //}
        //public void Delete(AtendimentoGrupoModel atendimentoGrupo)
        //{

        //    atendimentoGrupo.ClearPropertyModel();
        //    atendimentoGrupo.Excluido = true;
        //    _context.Entry(atendimentoGrupo).State = EntityState.Modified;
        //}
        //public void Update(AtendimentoGrupoModel atendimentoGrupo)
        //{
        //    Validation(atendimentoGrupo, EntityState.Modified);
        //    atendimentoGrupo.Validation();
        //    _context.AtendimentoGrupo.Update(atendimentoGrupo);
        //}

    }
}

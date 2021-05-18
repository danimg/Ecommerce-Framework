using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Ecommerce_Framework.Api.Models
{
    [Table("Usuario", Schema = "EcommerceFramework")]
    public class UsuarioModel
    {
        [Key]
        public int UsuarioId { get; set; }
        [Required, MaxLength(30)]
        public string Login { get; set; }

        [Required, MaxLength(200)]
        public string Senha { get; set; }

        [DefaultValue(true)]
        public bool Ativo { get; set; }
    }
}

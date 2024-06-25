namespace UsersCRUDApp.Server.Common.UserFriendlyExceptions
{
    public class NotFoundException : Exception
    {
        public NotFoundException(string? message) : base(message)
        {
        }
    }
}

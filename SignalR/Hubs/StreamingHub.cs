using Microsoft.AspNetCore.SignalR;
using System.Threading;
using System.Threading.Channels;
using System.Threading.Tasks;

namespace SignalR.Hubs
{
    public class StreamingHub : Hub
    {
        public void StreamInit()
        {
            Clients.All.SendAsync("StreamingStarted");
        }

        public ChannelReader<string> StartStreaming(CancellationToken cancellationToken)
        {
            var channel = Channel.CreateUnbounded<string>();
            _ = WriteToChannel(channel.Writer, cancellationToken);

            return channel.Reader;
        }

        private async Task WriteToChannel(ChannelWriter<string> writer, CancellationToken cancellationToken)
        {
            for (int i = 0; i < 10; i++)
            {
                await writer.WriteAsync(i.ToString());
                await Task.Delay(1000);
            }
            writer.Complete();
        }
    }
}

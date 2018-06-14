using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.IO;
using System.Runtime.Serialization.Formatters.Binary;
using System.Text;
using RabbitMQ.Client;
using RabbitMQ.Client.Events;

namespace ToDo.Messaging
{
    public class MessageHandler
    {
        private static readonly ConnectionFactory Factory = new ConnectionFactory() {HostName = "localhost"};

        public static void Send<T>(string queue, T payload)
            where T : class
        {
            var connection = Factory.CreateConnection();
            var channel = connection.CreateModel();
            channel.ExchangeDeclare("todo-app", "topic", durable: true);
            channel.QueueDeclare(queue, durable: true, exclusive: false, autoDelete: false, arguments: null);
            channel.QueueBind(queue, "todo-app", queue, null);


            var props = channel.CreateBasicProperties();
            props.DeliveryMode = 2;

            var body = Serialize(payload);
            channel.BasicPublish(exchange: "todo-app",
                routingKey: queue,
                basicProperties: props,
                body: body);
        }

        public static void Recieve<T>(string queue, EventHandler<BasicDeliverEventArgs> eventHandler)
            where T : class
        {
            var connection = Factory.CreateConnection();
            var channel = connection.CreateModel();

            channel.ExchangeDeclarePassive("todo-app");

            channel.QueueBind(queue: queue,
                exchange: "todo-app",
                routingKey: queue);

            var consumer = new EventingBasicConsumer(channel);
            consumer.Received += eventHandler;
            channel.BasicConsume(queue: queue,
                autoAck: true,
                consumer: consumer);
        }

        public static byte[] Serialize(object obj)
        {
            if (obj == null)
            {
                return null;
            }

            var bf = new BinaryFormatter();
            var ms = new MemoryStream();
            bf.Serialize(ms, obj);
            return ms.ToArray();
        }

        public static T Deserialize<T>(byte[] data)
            where T : class
        {
            if (data == null)
            {
                return default(T);
            }

            var bf = new BinaryFormatter();
            using (var ms = new MemoryStream(data))
            {
                var obj = bf.Deserialize(ms);
                return (T) obj;
            }
        }
    }
}
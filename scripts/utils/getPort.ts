import _getPort from 'get-port';

/**
 * 检查端口，占用+1 ,返回 promis
 * @param host
 * @param port
 */
export default async function getPort(host: string, port: number): Promise<number> {
    const result = await _getPort({ host, port });

    if (result === port) {
        return port + 1;
    }

    return port;
}

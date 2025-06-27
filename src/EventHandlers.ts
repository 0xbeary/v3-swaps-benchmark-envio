/*
 * Please refer to https://docs.envio.dev for a thorough guide on all Envio indexer features
 */
import {
  UniswapV3Pool,
  UniswapV3Pool_Swap,
} from "generated";

UniswapV3Pool.Swap.handler(async ({ event, context }) => {
  const entity: UniswapV3Pool_Swap = {
    id: `${event.chainId}_${event.block.number}_${event.logIndex}`,
    sender: event.params.sender,
    recipient: event.params.recipient,
    amount0: event.params.amount0,
    amount1: event.params.amount1,
    sqrtPriceX96: event.params.sqrtPriceX96,
    liquidity: event.params.liquidity,
    tick: Number(event.params.tick),
    blockNumber: BigInt(event.block.number),
    blockTimestamp: BigInt(event.block.timestamp),
    transactionHash: event.transaction.hash,
  };

  context.UniswapV3Pool_Swap.set(entity);
});
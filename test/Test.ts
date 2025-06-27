import assert from "assert";
import { 
  TestHelpers,
  UniswapV3Pool_Swap
} from "generated";
const { MockDb, UniswapV3Pool } = TestHelpers;

describe("UniswapV3Pool contract Swap event tests", () => {
  // Create mock db
  const mockDb = MockDb.createMockDb();

  // Creating mock for UniswapV3Pool contract Swap event
  const event = UniswapV3Pool.Swap.createMockEvent({/* It mocks event fields with default values. You can overwrite them if you need */});

  it("UniswapV3Pool_Swap is created correctly", async () => {
    // Processing the event
    const mockDbUpdated = await UniswapV3Pool.Swap.processEvent({
      event,
      mockDb,
    });

    // Getting the actual entity from the mock database
    let actualUniswapV3PoolSwap = mockDbUpdated.entities.UniswapV3Pool_Swap.get(
      `${event.chainId}_${event.block.number}_${event.logIndex}`
    );

    // Creating the expected entity
    const expectedUniswapV3PoolSwap: UniswapV3Pool_Swap = {
      id: `${event.chainId}_${event.block.number}_${event.logIndex}`,
      sender: event.params.sender,
      recipient: event.params.recipient,
      amount0: event.params.amount0,
      amount1: event.params.amount1,
      sqrtPriceX96: event.params.sqrtPriceX96,
      liquidity: event.params.liquidity,
      tick: event.params.tick,
    };
    // Asserting that the entity in the mock database is the same as the expected entity
    assert.deepEqual(actualUniswapV3PoolSwap, expectedUniswapV3PoolSwap, "Actual UniswapV3PoolSwap should be the same as the expectedUniswapV3PoolSwap");
  });
});

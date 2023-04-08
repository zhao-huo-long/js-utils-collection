import { eventBusBuilder } from '../index'

test('test', () => {
  const bus = eventBusBuilder()
  const callbackTest = (value: any) => {
    expect(value).toEqual({name: 'jerry.lee', email: 'lijiuyi1995@outlook.com' })
  }
  bus.on('test', callbackTest);
  bus.fire('test', {name: 'jerry.lee', email: 'lijiuyi1995@outlook.com' })
  const whiteFn = () => {}
  bus.on('test', whiteFn)

  expect(bus.__inspectHandlerStore__('test'))
  .toEqual([callbackTest, whiteFn])

  bus.off('test', callbackTest)
  expect(bus.__inspectHandlerStore__('test'))
  .toEqual([whiteFn])

  bus.once('test-once', (value) => {
    expect(value).toEqual({name: 'jerry.lee', email: 'lijiuyi1995@outlook.com' })
  })
  bus.fire('test-once', {name: 'jerry.lee', email: 'lijiuyi1995@outlook.com' })

  expect(bus.__inspectHandlerStore__('test-once')).toEqual([])

  bus.on('test-input-error', '' as any);
  expect(bus.__inspectHandlerStore__('test-input-error')).toEqual([]);

  bus.fire('test-no-handler', 'any')
  bus.off('test-no-handler', 'any' as any)
  expect(bus.__inspectHandlerStore__('test-no-handler')).toEqual([]);

  expect(bus.__inspectHandlerStore__()).toEqual({
    test: [whiteFn],
    'test-once': [],
  });
})

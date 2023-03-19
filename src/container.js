function containerFactory() {

  var cache = {}
  var _dependencies = {}

  function wire(dependencyName) {

    if (dependencyName === undefined) {
      throw new Error('dependencyName not defined')
    }

    function dependencyIsCached() {
      return cache[dependencyName] !== undefined
    }

    function createDependency() {
      return _dependencies[dependencyName]()
    }

    function cacheDependency(dependency) {
      cache[dependencyName] = dependency
      return dependency
    }

    function cachedDependency() {
      return cache[dependencyName]
    }

    return dependencyIsCached()
      ? cachedDependency()
      : cacheDependency(createDependency())
  }

  function build(dependencies) {

    if (dependencies === undefined) {
      throw new Error('dependencies not defined')
    }

    _dependencies = dependencies

    function buildDependency(name) {
      wire(name)
    }

    Object.keys(dependencies)
      .forEach(buildDependency)

    return cache
  }

  return {
    wire: wire,
    build: build
  }
}

module.exports = containerFactory

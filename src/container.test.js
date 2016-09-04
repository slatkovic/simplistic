var expect = require('chai').expect;

describe('dependencyContainer', function() {

  describe('wire', function() {

    it('validates component name', function() {

      function test() {
        createContainer().wire(undefined);
      }

      expect(test).to.throw('dependencyName not defined');
    });

    it('caches dependencies', function() {

      var container = createContainer();
      var fixtures = createFixtures({ container: container });

      container.build(fixtures.dependencies);

      expect(fixtures.$results.firstDependencyBuildCount).to.be.eql(1);
      expect(fixtures.$results.secondDependencyBuildCount).to.be.eql(1);
      expect(fixtures.$results.thirdDependencyBuildCount).to.be.eql(1);
    });
  });

  describe('build', function() {

    it('validates dependencies', function() {

      function test() {
        createContainer().build(undefined);
      }

      expect(test).to.throw('dependencies not defined');
    });

    it('builds dependencies', function() {

      var container = createContainer();
      var fixtures = createFixtures({ container: container });

      var dependencies = container.build(fixtures.dependencies);

      expect(dependencies.first).to.be.eql('first');
      expect(dependencies.second).to.be.deep.eql({ dependsOn: 'first' });
      expect(dependencies.third).to.be.deep.eql({ dependsOn: 'first' });
    });
  });
});

function createFixtures(options) {

  var $results = {
    firstDependencyBuildCount: 0,
    secondDependencyBuildCount: 0,
    thirdDependencyBuildCount: 0
  };

  return {

    dependencies: {

      first: function() {
        $results.firstDependencyBuildCount++;
        return 'first';
      },

      second: function() {
        $results.secondDependencyBuildCount++;
        return {
          dependsOn: options.container.wire('first')
        };
      },

      third: function() {
        $results.thirdDependencyBuildCount++;
        return {
          dependsOn: options.container.wire('first')
        };
      }
    },

    $results: $results
  };
}

function createContainer() {
  return require('./container')();
}

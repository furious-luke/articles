////////////////////////////////////////////////////////////////////////////////
// create

QUnit.module( 'create', {
    beforeEach: function() {
        this.x = slide.timepoint();
    }
});

QUnit.test( 'empty warp creates empty timepoints', function( assert ) {
    var ent = new slide.Entity();
    assert.deepEqual( ent.b, { abs: undefined, value: undefined } );
    assert.deepEqual( ent.c, { abs: undefined, value: undefined } );
});

QUnit.test( 'array warp interpreted as start and duration', function( assert ) {
    var ent = new slide.Entity([ this.x, 4 ]);
    assert.deepEqual( ent.b, { abs: this.x, value: undefined } );
    assert.equal( ent.c.abs, ent.b );
    assert.equal( ent.c.rel, 4 );
    assert.equal( ent.c.value, undefined );
});

QUnit.test( 'single value warp interpreted duration', function( assert ) {
    var ent = new slide.Entity( 3 );
    assert.deepEqual( ent.b, { abs: undefined, value: undefined } );
    assert.equal( ent.c.abs, ent.b );
    assert.equal( ent.c.rel, 3 );
    assert.equal( ent.c.value, undefined );
});

////////////////////////////////////////////////////////////////////////////////
// done

QUnit.module( 'done', {
    beforeEach: function() {
        this.ent = new slide.Entity([ 2, 4 ]);
    }
});

QUnit.test( 'returns true when done', function( assert ) {
    assert.equal( this.ent.done( 7 ), true );
});

QUnit.test( 'returns false when not done', function( assert ) {
    assert.equal( this.ent.done( 6 ), false );
});

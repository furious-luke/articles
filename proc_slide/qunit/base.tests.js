////////////////////////////////////////////////////////////////////////////////
// timepoint

QUnit.module( 'timepoint', {
    beforeEach: function() {
        this.x = slide.timepoint();
    }
});

QUnit.test( 'non-array value returned in absolute component', function( assert ) {
    assert.deepEqual( slide.timepoint( this.x ), { abs: this.x, value: undefined } );
});

QUnit.test( 'non-array value resolved if possible', function( assert ) {
    assert.deepEqual( slide.timepoint( 2 ), { abs: 2, value: 2 } );
});

QUnit.test( 'array populates both components', function( assert ) {
    assert.deepEqual( slide.timepoint( [2, 4] ), { abs: 2, rel: 4, value: 6 } );
});

////////////////////////////////////////////////////////////////////////////////
// resolve_timepoint

QUnit.module( 'resolve_timepoint', {
    beforeEach: function() {
        this.x = slide.timepoint();
        this.tp = slide.timepoint( [this.x, undefined] );
    }
});

QUnit.test( 'unresolvable sets value to undefined', function( assert ) {
    this.tp.value = 4;
    slide.resolve_timepoint( this.tp );
    assert.equal( this.tp.value, undefined );
});

QUnit.test( 'unresolvable returns true (for invalid)', function( assert ) {
    this.tp.value = 4;
    assert.equal( slide.resolve_timepoint( this.tp ), true );
});

QUnit.test( 'number for absolute resolves to value', function( assert ) {
    this.tp.abs = 4;
    slide.resolve_timepoint( this.tp );
    assert.deepEqual( this.tp, { abs: 4, rel: undefined, value: 4 } );
});

QUnit.test( 'number for absolute returns false (for not invalid)', function( assert ) {
    this.tp.abs = 4;
    assert.equal( slide.resolve_timepoint( this.tp ), false );
});

QUnit.test( 'number for sub-absolute and relative resolves to value', function( assert ) {
    this.x.value = 4;
    this.tp.rel = 1;
    slide.resolve_timepoint( this.tp );
    assert.deepEqual( this.tp, { abs: { abs: undefined, value: 4 }, rel: 1, value: 5 } );
});

QUnit.test( 'number for sub-absolute and relative returns false', function( assert ) {
    this.x.value = 4;
    this.tp.rel = 1;
    assert.equal( slide.resolve_timepoint( this.tp ), false );
});

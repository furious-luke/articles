////////////////////////////////////////////////////////////////////////////////
// prepare

QUnit.module( 'prepare', {
    beforeEach: function() {
        this.tl = new slide.Timeline();
        this.dummy = new slide.Node( 0, 1, 1 );
        this.ents = [
            new slide.Node( 0, 1, 2 ),
            new slide.Node( 0, 1, 3 ),
        ];
        this.ents.push( new slide.Node( 0, 1, [this.ents[0].b, 4] ) );
        this.ents.push( new slide.Node( 0, 1, [[this.ents[1].c, 2], 5] ) );
        this.ents.push( new slide.Node( 0, 1, [this.dummy.c, 2] ) );
        for( var ii = 0; ii < this.ents.length; ++ii )
            this.tl.add_entity( this.ents[ii] );
        this.parent = new slide.Node( 0, 1, [0, undefined] );
    }
});

QUnit.test( 'sets undefined timeline warp start to parent\'s', function( assert ) {
    assert.equal( this.tl.b.abs, undefined );
    this.tl.prepare( this.parent );
    assert.equal( this.tl.b.abs, this.parent.b );
});

QUnit.test( 'resolves timeline warp start', function( assert ) {
    assert.equal( this.tl.b.value, undefined );
    this.tl.prepare( this.parent );
    assert.equal( this.tl.b.value, 0 );
});

QUnit.test( 'resolves entity warp starts requiring siblings', function( assert ) {
    this.tl.prepare( this.parent );
    assert.equal( this.tl.entities[0].b.value, 0 );
    assert.equal( this.tl.entities[0].c.value, 2 );
    assert.equal( this.tl.entities[1].b.value, 2 );
    assert.equal( this.tl.entities[1].c.value, 5 );
});

QUnit.test( 'does not resolve warp end if children unresolved', function( assert ) {
    this.tl.prepare( this.parent );
    assert.equal( this.tl.c.value, undefined );
});

QUnit.test( 'resolves warp end if children resolved', function( assert ) {
    this.tl.entities.pop();
    this.tl.prepare( this.parent );
    assert.equal( this.tl.c.value, 12 );
});

QUnit.test( 'returns true if unresolved', function( assert ) {
    assert.equal( this.tl.prepare( this.parent ), true );
});

QUnit.test( 'returns false if resolved', function( assert ) {
    this.tl.entities.pop();
    assert.equal( this.tl.prepare( this.parent ), false );
});

# Testing

## Slide Options

### Major Information

 * Purple and large text: landings.html#slide=14
 
### Progressions

 * Stepping boxes: landings.html#slide=24
 
### Single-points

 * Stretch card: landings.html#slide=40
 
### Multi-points

 * Company logos: landings.html#slide=22
 
 * FAQ: landings.html#slide=25
 
 * Images and descriptions: landings.html#slide=27
 
 * Icons and descriptions: landings.html#slide=30
 
 * Major features: landings.html#slide=31

## Structure

Why do we even bother with testing? At first, with a small project,
testing can seem unnecessary, and it can definitely reduce raw
productivity. There are two things that will change this: larger
projects, and larger teams.

> Topic: Why do we even bother with testing?

> Features: Larger projects, and larger teams.

> Example: show code snippet, make change, confident deploying?

Both begin to require tests.  Tests can:

 * Guarantee the code is still doing all the things needed to support
   the ways it is used.
 
 * Make future alterations *much* easier.
 
 * Provide implicit documentation on intended usage.
 
 * Aid in debugging complex, cross-module issues.
 
> Features: all the above

Tests can, however, be problematic. They can:

 * Consume a lot of time in initial construction.
 
 * Require frequent maintenance.
 
 * Produce false positives (and false negatives) if not written well.
 
> Features: all the above
 
Goal: Bang for buck. Minimum effort in writing and maintaining, yet
still able to catch the bulk of common problems. In mission critical
parts of the code we may still need to write "hard to maintain" tests,
but that's okay.

What are the common problems we experience?

 * A) Incorrect logic when applied to boundary parameters.
 
 * B) Updates to one part of the code effect other parts of the code
   that are untested.

 * C) Changes in data format break front-end code.

How do we currently write tests? Technically, we currently write
white-box integration tests. These are great for *really* making sure
what we've done works the way we expect. They'll check not only that
the outputs of the system are correct, but that the internal state
matches our expectations. The problem with these is that they'll need
to be altered any time any part of the internals of the system change,
or sometimes if any part of the internals of the sub-systems are
changed. This makes for a lot of maintenance.

White-box testing can be good for mission critical parts of the
system, but what are some other ways we could test the rest of the
system?

Fuzz testing. This answers the most basic question: can we even run
the code? We place no requirements on the output, and instead just
ensure that the code runs and does not fail. Sounds silly, but this is
surprisingly good, and is estimated to catch something like 80% of
errors. This will usually require us to provide input to the part of
the system being tested, and so is not 100% devoid of maintenance as
we'll need to ensure the inputs are correct, but is much quicker to
write, and allows for greater coverage more quickly.

Property testing. This is a method of testing that attempts to write
tests that require very little maintenance. They capitalize on system
"invariants". These are properties of a system that should never
change regardless of changes to the internals of the system.

Hypothesis driven testing.

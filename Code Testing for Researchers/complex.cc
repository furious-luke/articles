#define CATCH_CONFIG_MAIN
#include <iostream>
#include <catch.hpp>

struct complex {
   double real;
   double imag;

   complex add( complex const& other ) const
   {
      return complex{ real + other.real, imag + other.imag };
   }

   complex sub( complex const& other ) const
   {
      return complex{ real - other.real, imag - other.imag };
   }

   complex div( complex const& other ) const
   {
      double den = other.real*other.real + other.imag*other.imag;
      return complex{ (real*other.real + imag*other.imag)/den,
                      (imag*other.real - real*other.imag)/den };
   }

   complex mul( complex const& other ) const
   {
      return complex{ real*other.real - imag*other.imag,
                      real*other.imag + imag*other.real };
   }

   bool operator==( double real ) const
   {
      return this->real == real && imag == 0.0;
   }

   bool operator==( complex const& other ) const
   {
      return real == other.real && imag == other.imag;
   }

   bool operator!=( complex const& other ) const
   {
      return real != other.real || imag != other.imag;
   }
};

std::ostream& operator<<( std::ostream& strm, complex const& obj )
{
   return strm << obj.real << " + " << obj.imag << "i";
}

TEST_CASE( "Complex numbers" ) {
   complex a{ 1, 0 }, b{ 0, 1 }, c{ 1, 1 };
   std::cout << a;
   REQUIRE( a.add( a ) == 2 );
   REQUIRE( a.sub( a ) == 0 );
   REQUIRE( a.add( b ) == c );
   REQUIRE( a.mul( a ) == a );
   REQUIRE( c.div( a ) != c );
}

service FooService {

    entity Foo {
        key ID : Integer;
    }

    action getWeather(location: String) returns { location: String; temp: String; };

}
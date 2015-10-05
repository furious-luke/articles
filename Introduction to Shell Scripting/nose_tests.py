def my_func():
    return True

def test_something():
    assert my_func() == False

def test_something_else():
    assert my_func() == True

def test_something2():
    assert my_func() == True

def test_something_else2():
    assert my_func() == True

---
path: '/posts/base-class-anti-pattern'
date: 2019-03-26:12:33.962Z
title: 'The BaseClass Anti-Pattern'
---

As a consultant I get to see a lot of code bases and on Android, by far, the most common
anti-pattern that I find is what I call the BaseClass anti-pattern.

In this article I will explain what it is, why it is bad and why it is so seductive.

## What is it?

So what is the BaseClass anti-pattern and how do I detect it?

1. Start out by opening the android project.
2. Locate an activity or a fragment class.
3. Does it extend something called `BaseActivity` or `BaseFragment`?

If the answer to #3 is yes then you my friend has fallen victim to the BaseClass anti-pattern.
If you open the `BaseActivity` or the `BaseFragment` class and that class contains more than
50 lines of code then you're probably in deep trouble.

## So why is this bad?

I will answer why it is bad by asking a question. What is the responsibility of the
`BaseActivity`? Except for being an `Activity` what does the class name tell you?
**NOTHING** right...

So the naming is bad, lets give it a better name! Well if you open the class
chances are that you will find something like this:

```java
class BaseActivity extends AppCompatActivity {
  @Inject
  Analytics analytics;

  @Override
  public void onCreate() {
    AppInjector.inject();
    super.onCreate();
  }

  @Override
  public void onStart() {
    super.onStart();
    analytics.trackScreen(this);
  }
}
```

Now try to come up with a name for this class, what is it responsible for?
`ActivityWithInjectionAndAnalytics` is not a very nice name and the _"And"_ part indicates
that the class has more than one responsibility and therefore is in violation
of the _single responsibility principle_. So people resort to calling it things like
`BaseActivity` and this creates a very _non-explicit_ abstraction. Extending `BaseActivity` tells
you nothing about what code you are bringing to your newly created activity.

So now you might think to your self that "This doesn't look too bad" and i would admit
that no, two methods are not the end of the world. However this is usually not where the
story ends. I have found the size of such a `BaseClass` usually has a linear correlation with time.
It starts to accumulate things like creating a `ViewModel` / `Presenter`, adding utility
functions that depend on a `Context` and sometimes even implementing business logic.

As time goes on people start to extend `BaseActivity` almost as a ritual rather than
out of a need for some functionality that `BaseActivity` provides. Maybe you only care about
one of the 150 methods overridden in the `BaseActivity`. Once you get to that
point you have effectively created a _static_ dependency on code that you don't have to depend on.
You run code that doesn't have to run. Maybe the fact that the extra code gets executed doesn't hurt you
(right now) but it will still execute and I absolutely promise you that one day, someone (maybe you)
wil modify some of the code in the `BaseActivity` to fit the need of a completely unrelated class and the
class that you wrote in the first place will have a `RuntimeException`. You or your colleague will be blamed,
fired and die alone.

## So why use a BaseClass?

I can only guess why other people do it but as someone who has created plenty of `BaseClass`es in the past
I can say that, for me, it was mostly due to two things.

- It was the easiest way of writing DRY (Do not repeat yourself) code.
- Android specific classes aren't that suited for the [decorator pattern](https://en.wikipedia.org/wiki/Decorator_pattern).

I probably had some piece of code, like injecting dependencies, that I thought: "Hey I inject
all of my activities in `onCreate`! That is duplicated code... lets get rid of that!". So I created
my initial `BaseActivity` to handle the injection and started hacking away. Later on I would find some
other piece of code that I would run in a lot of the activities, for instance converting from `dp` to `px`.
To do this I required access to a `Context`. Since I learned in school that OOP is all about dat
inheritance I just added a method to the `BaseClass` that did this conversion. Of course what I should have
done was creating a static method in a utility class:

```java
public final class Units {
  public static int dpToPx(Context context, float dp) {
    Resources resources = context.getResources();
    return (int) TypedValue.applyDimension(
        TypedValue.COMPLEX_UNIT_DIP,
        dp,
        resources.getDisplayMetrics()
    );
  }
}
```

Now any class that needs this can call it. There is simply no need to inherit any `BaseClass` so the
caller of the method can sleep safe knowing that nothing strange runs in `onStart`, `onCreate` or any of
the other callback methods that belong to the `Activity`.

If you can't get by with using a static helper method then create a class that handles your use case and
instantiate it in the `Activity`. Better yet, inject it with your dependency injector of choice!

But what if we need to run something that depends on the callback methods, like subscribing to some
observable data and then unsubscribing later on? Well in this case i would still prefer to be _explicit_
over implementing it the _implicit_ way with a `BaseClass`. Luckily we have even better options today with
[LifecycleObserver](https://developer.android.com/topic/libraries/architecture/lifecycle).

## Conclusion

DO **NOT** CREATE A BASE CLASS FOR ALL OF YOUR ACTIVITIES AND FRAGMENTS!

- It creates implicit, but very strong, coupling between your code and code that you probably, mostly, don't even care about.
- It makes it very hard to get a full picture of what an class does.
- It will grow and become a hot mess.
- There is probably a lot of code in the `BaseClass` that would be really easy to unit test if it was in it's own class,
  but the fact that it is in the `BaseClass` makes you unwilling or unable to test it.

This is very much a rant and an opinion piece and I would love to hear your opinion on the matter!

---
title: Comparisons Inside Arrays - Useful and Fancy!
---
I recently got some assistance from the *ALWAYS* helpful [Joel Tallow](https://github.com/vexx32) with looking for ways to improve my code. He looked through some code and gave me some improvements. He also showed me some really cool bits of code and this post will cover one that I thought was useful.

```powershell
# what does this code do? Let's find out!
$selection = @($preference, "Default" -ne $null)[0]
```

## Quick Refresher

Let's do a quick review of arrays and comparison operators if they aren't fresh in your mind.

### Arrays

```powershell
# This creates an array of 2 values. Arrays are good at holding multiple values
@('value1','Value2')

# To verify that this is of the array type, Run
@('value1','value2') -is [array]
```

### Array Indexing

```powershell
# We can use an index number to select which value we want out of the array
# We put the index number inside []
# [0] returns the first  value in the array, which is value1.
@('value1','Value2')[0]

# [1] returns the second value in the array (counting starts at 0), which is value2.
@('value1','value2','value3')[1]

# to get the last value in the array, we specify [-1]
@('value1','value2','value3')[1]

```

### Comparison Operators

```powershell
# Comparison operators compare things and then tell us if the comparison was true or false.
# Is 'Toby' the same string as 'Scranton Strangler'?
'Toby' -eq 'Scranton Strangler'
# darn, we almost had him.

'Pinocchio' -eq 'Real Boy'
# ouch, poor guy

# We can also determine if things are Null or not
$null -eq 'Michael'

5 -lt 6

# We haven't defined the NonExistentVariable yet, so it doesn't exist yet.
$null -eq $NonExistentVariable

```

### Comparison Operators Within Arrays

```powershell
# Let's have an array and put a comparison operator in it.
# This allows us to sort of filter
@(1,2,3 -GT 1)

@('','notBlank' -notlike '')

# Create an array without any null values.
@($NonExistentVariable, 'string' -ne $null)
```

## Code Time

```powershell
# We need to select a new office color. We would like to use the color in $preference.
# if $preference is null, then we will return 'CorporateGrayscale'
$newOfficeColor = @($preference, "CorporateGrayscale" -ne $null)[0]
# We have an array with a comparison. This effectively filters out any null values.
# we then select the [0] value, which will either be $preference or "corporateGrayscal"
# I hope that someone defined $preference 0_O

# This is how I traditionally would have handled something like this
if ($preference){
    $newOfficeColor = $preference
}
else {
    $newOfficeColor = "CorporateGrayscale"
}


# This is the actual code that was updated
$mimeType = [System.Web.MimeMapping]::GetMimeMapping($File)
$ContentType = @($mimeType, "application/octet-stream" -ne $null)[0]

# Old long code
$mimeType = [System.Web.MimeMapping]::GetMimeMapping($File)
if ($mimeType) {
    $ContentType = $mimeType
}
else {
    $ContentType = "application/octet-stream"
}
```

## Read More

[https://stackoverflow.com/questions/28732025/what-does-mean-in-powershell](https://stackoverflow.com/questions/28732025/what-does-mean-in-powershell)

[https://blogs.technet.microsoft.com/heyscriptingguy/2015/11/06/powertip-find-if-variable-is-array-2/](https://blogs.technet.microsoft.com/heyscriptingguy/2015/11/06/powertip-find-if-variable-is-array-2/)

[Everything You Wanted to Know About Arrays - Kevin Marquette](https://kevinmarquette.github.io/2018-10-15-Powershell-arrays-Everything-you-wanted-to-know/?utm_source=reddit&utm_medium=post)

[https://docs.microsoft.com/en-us/powershell/module/microsoft.powershell.core/about/about_arrays?view=powershell-6](https://docs.microsoft.com/en-us/powershell/module/microsoft.powershell.core/about/about_arrays?view=powershell-6)
from django.shortcuts import render

# Things to do until the project is ready to go live:
# OK 1. CSS customization
# Almost OK 2. Let the user customize the pomodoro settings. Also make the 
# pomodoro sessions 'pomme' work
# OK 3. Create a Python virtual environment, commit the changes and send upload to Github
# 4. Set the system live on PythonAnywhere
# 5. Sount alert for when the time is up
# 6. Skip function
# Bonus: Somehow collect user's data, maybe with cookies? 
# ... I wish I could get the user's browser activity


def main_page(request):
    context = {'state':'to_start'}
    # Click the Title Div to go to the About Page
    
    return render(request, 
        template_name="pomo/main_page.html", 
        context=context
    )

def about_page(request):
    # Render a page very similar to the main page
    # Explain the wordplay "pomodoro" and "pomme dorée"
    # Explain when did pomodoro came to be
    # And how to use the site
    # Click the Title Div again to go to the main page
    return render(request, template_name="pomo/about_page.html")
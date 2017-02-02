require "rails_helper"

xfeature "profile photo" do
  scenario "user uploads a profile photo" do
    visit root_path
    click_link "Sign Up"

    fill_in "Email", with: "ash@s-mart.com"
    fill_in "Password", with: "boomstick!3vilisd3ad"
    fill_in "Password confirmation", with: "boomstick!3vilisd3ad"
    attach_file :avatar, "#{Rails.root}/spec/support/images/cutesif.jpg"
    click_button "Sign up"

    expect(page).to have_content("Welcome! Thanks for joining!")
    expect(page).to have_css("img[src*='photo.png']")
  end
end

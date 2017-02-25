require "rails_helper"
require "database_cleaner"

DatabaseCleaner.strategy = :truncation

RSpec.feature "User creates a new bar" do
  DatabaseCleaner.start

  let(:user_one) { User.create(
    first_name: "Sam",
    last_name: "Cole",
    username: "Sammo",
    email: "123@gmail.com",
    password: "password"
    )
  }

  scenario "successful song creation" do
    login_as_user(user_one)
    visit songs_path
    expect(page).to have_content "New Song Form"

    fill_in "Name", with: "Seven Nation Army"
    fill_in "Artist", with: "The White Stripes"
    fill_in "Description", with: "An awesome song that uses random quotes for lyrics!"

    click_button "Add Song"

    expect(page).to have_content "Song created successfully!"
    expect(page).to have_content "Seven Nation Army"
  end

  scenario "failed song creation" do
    login_as_user(user_one)
    visit songs_path
    expect(page).to have_content "New Song Form"

    fill_in "Artist", with: "The White Stripes"
    fill_in "Description", with: "An awesome song that uses random quotes for lyrics!"

    click_button "Add Song"

    field = find_field("Artist")
    expect(field.value).to eq("The White Stripes")
    expect(page).to have_content "Name can't be blank"
  end

  scenario "failed song creation" do
    login_as_user(user_one)
    visit songs_path
    expect(page).to have_content "New Song Form"

    click_button "Add Song"

    expect(page).to have_content "Name can't be blank"
    expect(page).to have_content "Artist can't be blank"
  end
  DatabaseCleaner.clean
end

xfeature "can delete a song" do
  DatabaseCleaner.start

  let(:user_one) { User.create(
    first_name: "Sam",
    last_name: "Cole",
    username: "Sammo",
    email: "123@gmail.com",
    password: "password"
    )
  }

  let(:song) { Song.create(
    name: "Seven Nation Army",
    artist: "The White Stripes",
    description: "An awesome song that uses random quotes for lyrics!",
    user: user_one
    )
  }

  scenario "successfully delete a song" do
    login_as_user(user_one)
    song
    visit "/songs"

    expect(page).to have_content("Seven Nation Army")

    click_on "Seven Nation Army"
    click_on "Delete Song"

    expect(page).to_not have_content("Seven Nation Army")
  end
  DatabaseCleaner.clean
end

RSpec.feature "User edits a song" do
  DatabaseCleaner.start

    let(:user_one) { User.create(
      first_name: "Sam",
      last_name: "Cole",
      username: "Sammo",
      email: "123@gmail.com",
      password: "password"
      )
    }

    let(:user_two) { User.create(
      first_name: "Sterling",
      last_name: "Archer",
      username: "Dutchess",
      email: "archer@gmail.com",
      password: "things"
      )
    }

    let(:song_one) { Song.create(
      name: "Seven Nation Army",
      artist: "The White Stripes",
      description: "An awesome song that uses random quotes for lyrics!",
      user: user_one
      )
    }

  xscenario "successful edit" do
    login_as_user(user_one)
    song_one
    visit songs_path

    click_on "Seven Nation Army"

    expect(page).to have_content "The White Stripes"

    click_on "Edit Song"

    fill_in "Artist", with: "Jack White"

    click_on "Submit"

    expect(page).to_not have_content "The White Stripes"
    expect(page).to have_content "Jack White"
  end

  xscenario "no option to edit if they did not create" do
    login_as_user(user_two)
    song_one
    visit songs_path

    click_on "Seven Nation Army"

    expect(page).to_not have_content "Edit Song"
  end

  scenario "get kicked back if they manually enter URL" do
    login_as_user(user_two)
    song_one

    visit "/songs/#{song_one.id}/edit"

    expect(page).to have_content("You don't have permission to edit this song!")
  end
  DatabaseCleaner.clean
end

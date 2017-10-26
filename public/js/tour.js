const TiktimeTour = (function() {

  const tour = new Shepherd.Tour({
    defaults: {
      classes: 'shepherd-theme-arrows',
    },
  });

  const nextButton = [
      {
        text: 'Next',
        action: tour.next
      }
    ]

  const doneButton = [
      {
        text: 'Done',
        action: tour.next
      }
    ]

  tour.addStep('welcome', {
    title: 'Welcome to Tikti.me!',
    text: 'Tikti.me is a pomodo-style timer<br>to help you get things done.',
    attachTo: '.timerDisplay top',
    buttons: nextButton,
  });

  tour.addStep('audio', {
    title: 'Too loud?',
    text: 'Use the speaker icon to turn sound on or off.',
    attachTo: '.audioMute bottom',
    buttons: nextButton,
  });

  tour.addStep('graph', {
    title: 'Your progress',
    text: 'This graph will show how much you work each day:<br><center><img src="img/timer-graph-eg.png" width="350px"></center>',
    attachTo: '.timerGraph top',
    buttons: doneButton,
  });

  return tour;
})();

const TOUR_COMPLETED_KEY = "tour_completed_key";
const TOUR_COMPLETED = "tour_completed";
const tourCompleted = localStorage.getItem(TOUR_COMPLETED_KEY);
if (!tourCompleted || tourCompleted !== TOUR_COMPLETED) {
  TiktimeTour.start();
  localStorage.setItem(TOUR_COMPLETED_KEY, TOUR_COMPLETED);
}

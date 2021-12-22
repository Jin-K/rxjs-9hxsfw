export interface IComponent {
  ngOnInit(): void;
  ngAfterViewInit(): void;
  subscribeLaterInCode(): void;
  ngOnDestroy(): void;
}
